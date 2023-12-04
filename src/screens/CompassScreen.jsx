import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CompassScreen = ({ navigation }) => {
    const [getLocation, setLocation] = useState(null);
    const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Error', 'Permissão negada!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    useEffect(() => {
        const subscribeToMagnetometer = async () => {
            const magnetometerAvailable = await Magnetometer.isAvailableAsync();
            if (magnetometerAvailable) {
                const newSubscription = Magnetometer.addListener((data) => {
                    setMagnetometerData(data);
                });
                setSubscription(newSubscription);
            } else {
                Alert.alert('Error', 'Magnetômetro não disponível no dispositivo.');
            }
        };

        subscribeToMagnetometer();

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [subscription]);

    const calculateDirection = () => {
        const { x, y } = magnetometerData;
        const angle = Math.atan2(y, x);
        const angleDegrees = (angle * 180) / Math.PI;
        const direction = (angleDegrees + 360) % 360;

        return direction;
    };

    const getDirection = () => {
        const direction = calculateDirection();

        if (direction >= 45 && direction < 135) {
            return 'Leste';
        }else if (direction >= 135 && direction < 225) {
            return 'Sul';
        }else if (direction >= 225 && direction < 315) {
            return 'Oeste';
        }else {
            return 'Norte';
        }
    };

    const getCompassColor = () => {
        const direction = calculateDirection();

        if (direction >= 45 && direction < 135) {
            return 'orange';
        } else if (direction >= 135 && direction < 225) {
            return 'blue';
        } else if (direction >= 225 && direction < 315) {
            return 'yellow';
        } else {
            return 'grey';
        }
    };

    return (
        <View style={{ flex: 1, gap: 10, height: '100%' }}>
            
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    padding: 75,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 18}}>Direction: {getDirection()}</Text>
                </View>

                <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: 45,
                    paddingBottom: 20,
                }}
            >
                <MaterialCommunityIcons
                    name='cursor-pointer'
                    size={40}
                    color={getCompassColor()}
                    style={{ borderWidth: 1, transform: [{ rotate: `${calculateDirection()}deg` }] }}
                />
            </View>
                
                {!getLocation ? (
                    <Text style={{ padding: 15, borderRadius: 5, backgroundColor: 'rgba(255, 0, 0, .1)', color: '#c62828' }}>Carregando...</Text>
                ) : (
                    <>
                        <View style={{ flex: 1, width: 350 }}>
                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: getLocation.latitude,
                                    longitude: getLocation.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: getLocation.latitude, longitude: getLocation.longitude }}
                                    title='Sua localização'
                                    description='Esta é a sua localização atual.'
                                />
                            </MapView>
                        </View>
                    </>
                )}
                <View style={{ width: '100%', marginTop: 50 }}>
                    <Button title='Voltar' onPress={() => navigation.navigate('Home')} />
                </View>
            </View>
        </View>
    );
};

export default CompassScreen;