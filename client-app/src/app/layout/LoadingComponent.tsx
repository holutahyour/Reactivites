import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface PropInterface {
    inverted?: boolean;
    content?: string;
}

function LoadingComponent({inverted = true, content = 'Loading'}: PropInterface) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}

export default LoadingComponent
