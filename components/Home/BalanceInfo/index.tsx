import React from 'react';
import {Text, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';

type TBalanceInfoProps = {
    title: string;
    displayAmount: string;
    changePercentage: any;
    containerStyle: any;
}

export default function BalanceInfo(props: TBalanceInfoProps) {
    const {changePercentage, containerStyle, displayAmount, title} = props;

    return (
        <View style={{...containerStyle}}>
            <Text style={{color: '#bababa', fontSize: 16}}>{title}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}>
                <Text style={{
                    color: '#bababa',
                    fontSize: 18
                }}>$</Text>
                <Text style={{
                    color: 'white',
                    fontSize: 24,
                    marginLeft: 5,
                    fontWeight: 'bold'
                }}>{displayAmount}</Text>
                <Text style={{
                    color: '#bababa'
                }}> USD</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}>
                {
                    changePercentage != 0 &&
                        <Ionicons name={'trending-up-outline'} size={20} color={
                            (changePercentage > 0) ? '#09ed46' : '#de0d0d'
                        } />
                }
                <Text style={{
                    marginLeft: 5,
                    alignSelf: 'center',
                    color: (changePercentage == 0) ? 'gray' : (changePercentage > 0) ? '#09ed46' : '#de0d0d'
                }}>
                    {changePercentage}%
                </Text>

                <Text style={{
                    marginLeft: 10,
                    alignSelf: 'center',
                    color: '#808080'
                }}>
                    7d change
                </Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginBottom: -15,
                        paddingHorizontal: 5,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45%'
                    }}
                >
                    <Ionicons name={'paper-plane-outline'} color={"black"} size={25} />
                    <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Transfer</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginBottom: -15,
                        paddingHorizontal: 5,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45%'
                    }}
                >
                    <Ionicons name={'arrow-down-circle-outline'} color={"black"} size={25} />
                    <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Withdraw</Text>
                </View>
            </View>
        </View>
    )
}