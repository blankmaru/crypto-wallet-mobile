import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import BalanceInfo from '../components/Home/BalanceInfo/';

export default function HomeScreen() {

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
                    displayAmount={"45.000"}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
