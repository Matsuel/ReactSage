import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
    stroke?: number,
}

function Protection({
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
                d="M13.991 22.813c.158 0 .396-.053.624-.176 5.054-2.751 6.812-4.026 6.812-7.225V8.776c0-1.054-.404-1.432-1.292-1.81-.967-.413-4.254-1.556-5.203-1.881a3.15 3.15 0 00-.94-.158c-.3 0-.642.079-.932.158-.95.272-4.237 1.477-5.204 1.88-.887.37-1.292.757-1.292 1.811v6.636c0 3.2 1.758 4.456 6.812 7.225.229.123.466.175.615.175zm0-1.864c-.123 0-.246-.044-.5-.202-4.009-2.443-5.257-3.102-5.257-5.66v-1.433h5.907v-7.04c.088.018.193.044.325.088 1.16.457 3.665 1.345 4.974 1.81.255.097.317.23.317.546v4.596H14.14v7.269a.448.448 0 01-.15.026z"
                fill={color}
            />
        </Svg>
    )
}

export default Protection