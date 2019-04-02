import * as React from "react";

export abstract class Store<TModel> {
    ViewModel: TModel;
    Change: Function = () => {};
}

export interface IHaveStore<Store> { 
    store: Store;
}

export abstract class StatefulComponent<TProps extends IHaveStore<Store<TModel>>, TModel> extends React.Component<TProps, TModel>  {     
    constructor(props: TProps) {
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