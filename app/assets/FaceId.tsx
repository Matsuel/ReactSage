import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function FaceId(props: any) {
    return (
        <Svg
            width="30px"
            height="30px"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G fillRule="nonzero" fill="#fff" stroke="none" strokeWidth={1}>
                <Path d="M4.114 21.943v-8.914c0-5.036 3.88-8.915 8.915-8.915h8.914a2.057 2.057 0 100-4.114h-8.914C5.72 0 0 5.721 0 13.029v8.914a2.057 2.057 0 104.114 0z" />
                <Path
                    d="M4.114 21.943v-8.914c0-5.036 3.88-8.915 8.915-8.915h8.914a2.057 2.057 0 100-4.114h-8.914C5.72 0 0 5.721 0 13.029v8.914a2.057 2.057 0 104.114 0z"
                    transform="matrix(-1 0 0 1 80 0)"
                />
                <Path
                    d="M4.114 21.943v-8.914c0-5.036 3.88-8.915 8.915-8.915h8.914a2.057 2.057 0 100-4.114h-8.914C5.72 0 0 5.721 0 13.029v8.914a2.057 2.057 0 104.114 0z"
                    transform="matrix(1 0 0 -1 0 80)"
                />
                <Path
                    d="M4.114 21.943v-8.914c0-5.036 3.88-8.915 8.915-8.915h8.914a2.057 2.057 0 100-4.114h-8.914C5.72 0 0 5.721 0 13.029v8.914a2.057 2.057 0 104.114 0z"
                    transform="rotate(180 40 40)"
                />
                <Path
                    d="M0 2.143V7.86c0 1.184.895 2.143 2 2.143s2-.96 2-2.143V2.143C4 .959 3.105 0 2 0S0 .96 0 2.143z"
                    transform="translate(21.754 28.07)"
                />
                <G>
                    <Path
                        d="M0 2.143V7.86c0 1.184.895 2.143 2 2.143s2-.96 2-2.143V2.143C4 .959 3.105 0 2 0S0 .96 0 2.143z"
                        transform="translate(54.737 28.07)"
                    />
                </G>
                <Path d="M25.932 59.083C29.833 62.724 34.558 64.56 40 64.56s10.167-1.837 14.068-5.478a2.105 2.105 0 00-2.873-3.078C48.08 58.913 44.382 60.35 40 60.35c-4.382 0-8.079-1.438-11.195-4.346a2.105 2.105 0 00-2.873 3.078zM40 30.175v14.737c0 .943-.461 1.404-1.409 1.404h-1.398a2.105 2.105 0 100 4.21h1.398c3.272 0 5.62-2.344 5.62-5.614V30.175a2.105 2.105 0 10-4.211 0z" />
            </G>
        </Svg>
    )
}

export default FaceId