import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { Svg } from 'react-native-svg';

const graphicColor = ['red', 'green', 'yellow']; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
//const wantedGraphicData = [{ x: 'Liquid', y: 35 }, { x: 'Iced', y: 90 }, { x: 'Total', y: 55 }];
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
//const defaultGraphicData = [{ x: 'Liquid', y: 0 }, { x: 'Iced', y: 0 }, { x: 'Total', y: 100 }]; // Data used to make the animate prop work

export default function DonutChart() {
    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    useEffect(() => {
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
    }, []);

    return (
        // <Svg viewBox='0 0 1000 1000'>
        //     <VictoryPie
        //         standalone={false}
        //         animate={{ easing: 'exp' }}
        //         padAngle={5}
        //         colorScale={graphicColor}
        //         data={graphicData}
        //         innerRadius={100}
        //         style={{
        //             labels: {
        //                 fill: "red"
        //             }
        //         }}
        //     />
        //     <VictoryLabel
        //         textAnchor="middle"
        //         style={{ fontSize: 60 }}
        //         x={200} y={200}
        //         text="Pie!"
        //     />
        // </Svg>

        <View style={{ justifyContent: "center"}}>
            <VictoryPie
                animate={{ easing: 'exp' }}
                width= {200}
                height={200}
                colorScale={graphicColor}
                data={graphicData}
                padAngle={3}
                innerRadius={20}
                labels = {() => null}
                style={{
                    
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({})