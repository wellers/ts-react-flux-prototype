import * as React from "react";

export abstract class Store<TModel> {
    viewModel: TModel;
    change: Function = () => {};
}

export interface IHaveStore<Store> { 
    store: Store;
}

export abstract class StatefulComponent<TProps extends IHaveStore<Store<TModel>>, TModel> extends React.Component<TProps, TModel>  {     
    constructor(props: TProps) {
        super(props);
        this.state = this.props.store.viewModel;
    }

    componentDidMount() {
        this.props.store.change = () => { this.storeChanged(); };
    }

    componentWillUnmount() {
        this.props.store.change = () => {};
    }

    storeChanged() {
        this.setState(this.props.store.viewModel);
    }
}