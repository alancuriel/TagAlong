import geohash from "ngeohash";

// Code from Jake Richards
//https://levelup.gitconnected.com/nearby-location-queries-with-cloud-firestore-e7f4a2f18f9d

class GeoHash {
  getGeohashRange = (latitude, longitude, distance /* Miles */) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(greaterLat, greaterLon);

    return {
      lower,
      upper
    };
  };

  getGeoHash = (latitude, longitude) => {
    return geohash.encode(latitude,longitude);
  };
}

GeoHash.shared = new GeoHash();
export default GeoHash;
