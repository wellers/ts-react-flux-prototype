import * as React from "react";

const e = React.createElement;

export interface DropDownItem<TValue> {
    label: String;
    value: TValue;
}

export interface SingleSelectBoxViewModel<TValue> { 
    isDropDownOpen: boolean;
    dropdownItems: Array<DropDownItem<TValue>>;
    selectedItem: DropDownItem<TValue>;
    disabled: boolean;
    highlightedValue: TValue;   
 }

export class SingleSelectBoxProps<TValue> { 
    viewModel: SingleSelectBoxViewModel<TValue>;
    onChange: (model: SingleSelectBoxViewModel<TValue>) => void;  
}

export class SingleSelectBox<TValue> extends React.PureComponent<SingleSelectBoxProps<TValue>> {
    constructor(props: SingleSelectBoxProps<TValue>) {
        super(props);
    }

    getInitialHighlightValue() : TValue {
        if (this.props.viewModel.selectedItem != null)
            return this.props.viewModel.selectedItem.value;

        return this.props.viewModel.dropdownItems[0].value;
    }

    renderCurrentSelection() {
        return e('a', { 
            className: "selected-item",
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault(),
            onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => {
                if (this.props.viewModel.disabled)
                    return;                       

                event.preventDefault();

                var newDropDownOpenState = !this.props.viewModel.isDropDownOpen;
                var newHighlightedValue: TValue;
                if (newDropDownOpenState)
                    newHighlightedValue = this.getInitialHighlightValue();
                else
                    newHighlightedValue = null;
                this.props.onChange({...this.props.viewModel, isDropDownOpen: newDropDownOpenState, highlightedValue: newHighlightedValue });
            }
        }, this.props.viewModel.selectedItem.label);
    }

    renderDropdownMenu() { 
        return e('ul', { 
                style: { display: this.props.viewModel.isDropDownOpen ? "block" : "none" },
                onMouseOut: (event: React.MouseEvent<HTMLButtonElement>) => this.props.onChange({...this.props.viewModel, highlightedValue: null}) 
            }, 
            this.props.viewModel.dropdownItems.map((item, i) => {
                var isValueSelected = this.props.viewModel.selectedItem.value == item.value;
                var isValueHighlighted = this.props.viewModel.highlightedValue == item.value;

                return e('li', { 
                    key: i, 
                    className: (isValueSelected ? "selected " : "") + (isValueHighlighted ? "highlighted " : ""),
                    onMouseEnter: () => this.props.onChange({...this.props.viewModel, highlightedValue: item.value }),
                    onClick: () => this.props.onChange({...this.props.viewModel, isDropDownOpen: false, selectedItem: item })                    
                }, item.label);
            })
        );
    }

    render() {
        return e('span', { className: "single-select" }, 
            this.renderCurrentSelection(),
            this.renderDropdownMenu()
        );
    }
}