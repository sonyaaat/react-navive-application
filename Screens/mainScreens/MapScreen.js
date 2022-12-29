import MapView,{Marker} from 'react-native-maps';
const MapScreen=({route})=>{
    const {longitude,latitude}=route.params.location
    return(
        <MapView style={{flex:1}} initialRegion={{latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,}}>
                <Marker coordinate={{latitude,
            longitude,}} title="travelPhoto"/>
            </MapView>
    )
}
export default MapScreen