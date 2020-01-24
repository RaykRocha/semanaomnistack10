import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'


function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
            }
        }
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView initialRegion={currentRegion} style={styles.map}>
                <Marker coordinate={{ latitude: -23.5601516, longitude: -46.6418032 }}>
                    <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/42194587?s=460&v=4' }} />
                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: 'raykrocha' });
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>Rayk Rocha</Text>
                            <Text style={styles.devBio}>student of information systems</Text>
                            <Text style={styles.devTechs}>Java, PHP</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
                    <View style={styles.searchForm}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar devs por techs..."
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                        <TouchableOpacity onPress={() => { }} style={styles.loadButton}>
                            <MaterialIcons name="my-location" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
        </>
    );

}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 8,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    searchInput: {
        flex: 1,
        height: 50,
        color: "#333",
        backgroundColor: "#FFF",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#8e4dff",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: "center",
        marginLeft: 15
    }

});

export default Main;