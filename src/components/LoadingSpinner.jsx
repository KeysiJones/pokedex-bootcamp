import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

export const LoadingSpinner = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 999px;
    border: 5px solid #fd7d24;
    border-top: 5px solid whitesmoke;
    margin: 0 auto;
    animation: ${rotate} 1s linear infinite;
`