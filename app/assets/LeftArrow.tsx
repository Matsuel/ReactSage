import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
}

function LeftArrow({
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </Svg>
    )
}

export default LeftArrow