//TODO add your MAPBOX token here:
mapboxgl.accessToken = 'YOUR-API-CODE-HERE';


// Load Light Styled Map
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/light-v10",
	center: [-71.104081, 42.365554],
	zoom: 14,
});

const markersArray = [];

const busColor = [
	"DarkTurquoise",
	"LightPink",
	"LightGrey",
	"MistyRose",
	"Coral",
	"Lavender",
	"PaleVioletRed",
	"LightSalmon",
	"LightSeaGreen",
	"PeachPuff",
	"Plum",
	"RosyBrown",
	"SteelBlue",
	"Teal",
	"Tomato",
	"MediumTurquoise",
];

// function that will pull GetBusLocations that waits for the response to get the buses
async function run() {
	// get bus location data
	const locations = await getBusLocations();

	//timeStamp for the buses
	console.log(new Date());

    // i for colors array. Used inside forEach below
	let i = 0;

	locations.forEach((stop) => {
		i++;
		console.log(stop);
		if (!markersArray[stop.id]) {
			markersArray[stop.id] = new mapboxgl.Marker({
				color: busColor[i],
			});
		} else {
            if (markersArray[stop.id]._lngLat.lng == stop.attributes.longitude) {
                console.log('Bus ' + stop.id + ' of color ' + busColor[i] +' is static')
            }
        }
		markersArray[stop.id]
			.setLngLat([stop.attributes.longitude, stop.attributes.latitude])
			.addTo(map);
	});
	console.log(markersArray);

	// timer for the run function -getting bus locations every +15sec
	setTimeout(run, 15000);
}

// Request BUS DATA from MBTA's API
// using async function, so we can use fetch
async function getBusLocations() {
	// url with the json for the api
	const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";

	// calling data and catching it in a response
	const response = await fetch(url);

	// extract the data within response and wait for that data to be extracted
	const json = await response.json();
	console.log(json);

	//return data to the calling function
	return json.data;
}

run();
