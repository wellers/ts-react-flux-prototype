import * as React from "react";

export abstract class Store<S> {
    ViewModel: S;
    Change: Function = () => {};
}

export interface IHaveStore<Store> { 
    store: Store;
}

export abstract class StatefulComponent<P extends IHaveStore<Store<S>>, S> extends React.Component<P, S>  {     
    constructor(props: P) {
        super(props);
        this.state = this.props.store.ViewModel;
    }

    componentDidMount() {
        this.props.store.Change = () => { this.StoreChanged(); };
    }

    componentWillUnmount() {
        this.props.store.Change = () => {};
    }

    StoreChanged() {
        this.setState(this.props.store.ViewModel);
    }
}