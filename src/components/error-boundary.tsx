import React from "react";

type fallbackRender = (props:{error:Error|null})=>React.ReactElement

// export class ErrorBoundary extends React.Component<{children:ReactNode,fallbackRender:fallbackRender}> {}
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:fallbackRender}>,{error:Error|null} > {

    state = {error :null}
    //当子组件抛出异常，这里会接受并调用
    static getDerivedStateFromError(error:Error){
        return {error}
    }
    render(){
        const {error} = this.state;
        const {fallbackRender,children} = this.props
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}