import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
}

function RightArrow({
    color = "#000",
}: Props) {
    return (
        <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.5}
            stroke={color}
            width={20}
            height={20}
        >
            <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </Svg>
    )
}

export default RightArrow