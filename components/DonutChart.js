import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { VictoryPie } from 'victory-native';

/*
This class is to set up display of donut chart.
It is only allow 3 values to display the chart.
It not have labels and title on the chart. 
*/

const graphicColor = ['red', '#e6e300', '#00cc10']; // Colors of donut chart 
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // not acutal data to set the defualt setting. It is part for amination process.

export default function DonutChart({getGraphicData}) {

    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    useEffect(() => {
        setGraphicData(getGraphicData); // fetch and setting the actual data that we want to display in donut chart.
    }, []);

    return (

        <View style={{ justifyContent: "center"}}>

            {/* Donut chart display */}
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