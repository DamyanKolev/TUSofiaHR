import { Bar, BarDesign, Button, ButtonDesign } from "@ui5/webcomponents-react";
import { FC, useEffect, useState } from "react";
import "@ui5/webcomponents-icons/open-command-field"
import "@ui5/webcomponents-icons/close-command-field"
import "@ui5/webcomponents-icons/navigation-right-arrow"
import "@ui5/webcomponents-icons/navigation-left-arrow"
import { ButtonsStates, defaultDisabledButtonStates, defaultDisplayButtonStates } from "@/models/PaginationBarStates";
import { useSearchParams } from "react-router-dom";


interface PaginationBarProps {
    pages: int,
    setPage: (page: int) => void
}

const PaginationBar:FC<PaginationBarProps> = ({pages, setPage}) => {
    const [disabledState, setDisabledStates] = useState<ButtonsStates>(defaultDisabledButtonStates)
    const [displayStates, setDisplayStates] = useState<ButtonsStates>(defaultDisplayButtonStates)
    const [pageButtons, setPageButtons] = useState<Array<int>>([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [initState, setInitState] = useState<boolean>(false)
    const page = searchParams.get("page")
    const [selected, setSelected] = useState<int>(page? Number(page) : 1)

    const disableButtons = (array: Array<int>) => {
        const last = array.length - 1
        if(selected == 1 && selected == array[0]){
            setDisabledStates({...disabledState, first: true, previous: true})
        }
        else if(selected == array[last]) {
            setDisabledStates({...disabledState, next: true, last: true})
        }
        else {
            setDisabledStates(defaultDisabledButtonStates)
        }
    }

    const initButtonStates = (array: Array<int>) => {
        if(pages == 1) {
            setDisplayStates({first: false, previous: false, next: false, last: false})
        }
        else if(pages<9){
            setDisplayStates({...displayStates, last: false, first: false})
            disableButtons(array)
        }
        else {
            disableButtons(array)
        }
    }


    const initPageButtons = () => {
        let array:Array<int> = []

        if(pages < 9){
            for (let index = 1; index <= pages; index++) {
                array.push(index)
            }
        }
        else {
            const last = pageButtons.length - 1
            if(selected == pageButtons[0] && selected > 1) {
                pageButtons.forEach(value => {
                    array.push(value-1)
                })
            }
            else if (selected == pageButtons[last] && selected < pages){
                pageButtons.forEach(value => {
                    array.push(value+1)
                })
            }
            else{
                if((pages - selected) >= 9) {
                    for (let index = selected; index <= (selected+8); index++) {
                        array.push(index)
                    }
                }
                else {
                    const currentIndex = pages - 8
                    for (let index = currentIndex; index <= pages; index++) {
                        array.push(index)
                    }
                }
            }
        }
        initButtonStates(array)
        setPageButtons(array)
    }


    useEffect(() => {
        initPageButtons()
        if(initState) {
            setSearchParams({page: `${selected}`})
            setPage(selected)
        }
        setInitState(true)
    }, [selected])

    const onClickNumberPage = (event: any) => {
        const pageNumber = event.target.innerHTML
        setSelected(Number(pageNumber))
    }

    const onClickFirstPage  = () => {
        setSelected(1)
    }

    const onClickPreviousPage  = () => {
        const pageNumber = selected-1
        setSelected(pageNumber)
    }

    const onClickNextPage  = () => {
        const pageNumber = selected+1
        setSelected(pageNumber)
    }

    const onClickLastPage  = () => {
        setSelected(pages)
    }

    return(
        <Bar design={BarDesign.Footer}>
            {displayStates.first &&
                <Button 
                    icon="close-command-field" 
                    onClick={onClickFirstPage} 
                    disabled={disabledState.first} 
                    design={ButtonDesign.Transparent}
                />
            }
            {displayStates.previous &&
                <Button 
                    icon="navigation-left-arrow" 
                    onClick={onClickPreviousPage} 
                    disabled={disabledState.previous} 
                    design={ButtonDesign.Transparent}
                />
            }


           {(pages != 1) &&
                pageButtons.map((value: int, key: int) => {
                    let disabled = false
                    if(value == selected){
                        disabled = true
                    }
                    return (
                        <Button 
                            onClick={onClickNumberPage} 
                            disabled={disabled} 
                            key={key} 
                            design={ButtonDesign.Transparent}
                        >   {value}
                        </Button>
                    )
                })
           }


            {displayStates.next &&
                <Button 
                    icon="navigation-right-arrow" 
                    onClick={onClickNextPage} 
                    disabled={disabledState.next} 
                    design={ButtonDesign.Transparent}
                />
            }
            {displayStates.last &&
                <Button 
                    icon="open-command-field" 
                    onClick={onClickLastPage} 
                    disabled={disabledState.last} 
                    design={ButtonDesign.Transparent}
                />
            }
        </Bar>
    )
}

export default PaginationBar