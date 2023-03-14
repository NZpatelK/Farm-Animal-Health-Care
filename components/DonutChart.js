import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { Svg } from 'react-native-svg';

const graphicColor = ['red', '#e6e300', '#00cc10']; // Colors
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];

export default function DonutChart({getGraphicData}) {
    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    useEffect(() => {
        setGraphicData(getGraphicData); // Setting the data that we want to display
    }, []);

    return (

        <View style={{ justifyContent: "center"}}>
            <VictoryPie
                padding={10}
                animate={{ easing: 'exp' }}
                width= {150}
                height={150}
                colorScale={graphicColor}
                data={graphicData}
                padAngle={8}
                innerRadius={40}
                labels = {() => null}
            />

        </View>
    );
}

const styles = StyleSheet.create({})