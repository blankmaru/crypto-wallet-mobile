import * as React from 'react';
import {StyleSheet, View, Dimensions, FlatList, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import BalanceInfo from '../components/Home/BalanceInfo/';
import {
    LineChart,
} from 'react-native-chart-kit';
import {useEffect, useState} from "react";
import axios, {AxiosResponse, AxiosError} from 'axios';
import {Ionicons} from "@expo/vector-icons";

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [20, 13, 34, 51, 36, 43],
            strokeWidth: 2, // optional
        },
    ],
};

export default function HomeScreen() {
    const [coins, setCoins] = useState<Array<any>>([]);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&
        price_change_percentage=7d`)
            .then(async (res: AxiosResponse) => {
                setCoins(res.data);
                console.log(res.data)
            }).catch(async (err: AxiosError) => {
            console.error(err);
        })
    }, [])

    function renderWalletInfoSection() {
        return (
            <View style={{
                paddingHorizontal: 25,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: '#1f1f1f'
            }}>
                <BalanceInfo
                    title={"Your Wallet"}
                    displayAmount={"43.00"}
                    changePercentage={"2.30"}
                    containerStyle={{
                        marginTop: 50
                    }}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderWalletInfoSection()}
            <LineChart
                data={line}
                width={Dimensions.get('window').width} // from react-native
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundColor: 'black',
                    backgroundGradientFrom: '#3b3b3b',
                    backgroundGradientTo: '#454545',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    marginTop: 40,
                }}
            />

            {coins.length > 0
                ? <FlatList
                    data={coins}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: 30,
                        paddingHorizontal: 10,
                        paddingLeft: 20,
                        paddingBottom: 50
                    }}
                    ListHeaderComponent={
                        <View style={{marginBottom: 10}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                                Top Cryptocurrency
                            </Text>
                        </View>
                    }
                    renderItem={({item}) => {

                        let priceColor = (item.market_cap_change_percentage_24h == 0) ? 'gray' : (item.market_cap_change_percentage_24h > 0) ? 'green' : 'red';

                        return (
                            <TouchableOpacity
                                style={{
                                    height: 55,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}
                            >
                                <View style={{width: 35}}>
                                    <Image
                                        source={{uri: item.image}}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>$ {item.current_price}</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}>
                                        {item.market_cap_change_percentage_24h > 0 ?
                                            <Ionicons name={'trending-up-outline'} size={20} color={priceColor}/> :
                                            <Ionicons name={'trending-down-outline'} size={20} color={priceColor}/>}
                                        <Text style={{
                                            marginLeft: 5,
                                            color: priceColor,
                                            lineHeight: 15
                                        }}>{item.market_cap_change_percentage_24h.toFixed(2)}%</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                : <ActivityIndicator size={"large"} color={"white"} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
