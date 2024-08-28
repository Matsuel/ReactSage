import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
}

function More({
    color = "#000",
    width = 20,
}: Props) {
    return (
        <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke={color}
            width={width}
            height={width}
        >
            <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
        </Svg>
    )
}

export default More