import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
    stroke?: number,
}

function Power({
    color = "#000",
    width = 20,
    stroke = 3.5,
}: Props) {
    return (
        <Svg
            width={width}
            height={width}
            viewBox="0 0 28 28"
            fill="none"
        >
            <Path
                d="M13.991 13.69c.554 0 .914-.387.914-.967V5.006c0-.58-.36-.976-.914-.976-.545 0-.914.396-.914.976v7.717c0 .58.37.966.914.966zm0 9.052c4.984 0 9.097-4.113 9.097-9.088a8.992 8.992 0 00-2.821-6.521C19.352 6.236 18.06 7.44 19 8.39a7.235 7.235 0 012.268 5.264 7.253 7.253 0 01-7.278 7.278 7.243 7.243 0 01-7.26-7.278c0-2.091.862-3.955 2.26-5.273.94-.958-.352-2.153-1.266-1.257a8.979 8.979 0 00-2.822 6.53c0 4.975 4.114 9.088 9.088 9.088z"
                fill={color}
            />
        </Svg>
    )
}

export default Power