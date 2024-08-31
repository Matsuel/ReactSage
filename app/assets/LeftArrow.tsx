import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
    stroke?: number,
}

function LeftArrow({
    color = "#000",
    width = 20,
    stroke = 3.5,
}: Props) {
    return (
        <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={stroke}
            stroke={color}
            width={width}
            height={width}          
        >
            <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </Svg>
    )
}

export default LeftArrow