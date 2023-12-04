import React from 'react'
import { View, Text, Button } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, height: '100%',}}>
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 30,
                    paddingBottom: 5,
                    backgroundColor: 'skyblue',
                    paddingHorizontal: 5
                }}
            >
                <Text
                    style={{
                        marginTop: 10,
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 25,
                        textAlign: 'center'
                    }}
                >
                    Seja Bem Vindo
                </Text>
            </View>
            <View style={{padding: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20,}}>Alunos:</Text>
                <View style={{flexDirection: 'row',gap: 10,}}>
                    <Text style={{fontWeight: 500, fontSize: 16}}>Felipe Vieira</Text>
                    <Text style={{fontWeight: 500, fontSize: 16}}>|   Arthur</Text>
                </View>
                <View style={{gap: 10, marginTop: 30, width: '100%',}}>
                    <View><Button title='Compass' onPress={() => navigation.navigate('CompassScreen')}/></View>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen