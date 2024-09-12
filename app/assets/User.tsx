import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
    stroke?: number,
}

function UserIcon({
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
                d="M13.991 22.742c4.984 0 9.097-4.113 9.097-9.088 0-4.974-4.122-9.088-9.106-9.088-4.974 0-9.079 4.114-9.079 9.088 0 4.975 4.114 9.088 9.088 9.088zm-.009-7.655c-1.722-.009-3.058-1.45-3.058-3.357-.018-1.793 1.345-3.288 3.058-3.288 1.714 0 3.059 1.495 3.059 3.287 0 1.908-1.336 3.376-3.059 3.358zm0 6.152c-1.968 0-4.06-.817-5.387-2.241 1.01-1.512 3.014-2.39 5.387-2.39 2.347 0 4.369.86 5.388 2.39-1.327 1.424-3.419 2.241-5.388 2.241z"
                fill={color}
            />
        </Svg>
    )
}

export default UserIcon