import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
    stroke?: number,
}


function NotificationsIcon({
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
                d="M6.969 19.464h14.053c.906 0 1.46-.492 1.46-1.23 0-.932-.844-1.732-1.635-2.488-.624-.606-.765-1.872-.88-3.04-.14-3.218-1.08-5.485-3.357-6.303-.36-1.16-1.318-2.056-2.619-2.056-1.292 0-2.25.896-2.619 2.056-2.268.818-3.217 3.085-3.349 6.302-.114 1.169-.263 2.435-.878 3.041-.791.756-1.635 1.556-1.635 2.487 0 .739.553 1.23 1.459 1.23zm7.022 3.621c1.565 0 2.698-1.116 2.813-2.39h-5.616c.114 1.274 1.247 2.39 2.803 2.39z"
                fill={color}
            />
        </Svg>
    )
}

export default NotificationsIcon