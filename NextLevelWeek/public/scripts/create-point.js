

function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then( (res) => {return res.json() })
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }


    } )
}

populateUFs()


function getCities (event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {return res.json() })
    .then( cities => {
        
        for( const city of cities ) {
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


    // itens de Coleta
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []; //Array [] coleção de dados

function handleSelectedItem(event) {
    const itemLi = event.target
    
    //add or remove a class using "toggle"
    itemLi.classList.toggle("selected") 

    const itemId = itemLi.dataset.id

    


    // verificar se existem itens selecionados, se sim
    // pagar os items selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item === itemId //será true or false
        return itemFound
    })

    
    //se já estiver selecionado, tirar da selecao
    if(alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId //isso retorna o falso caso igual então ele tira
            return itemIsDifferent
        })

        selectedItems = filteredItems        
    } else { //se não estiver selecionado, adiconar a selecao
        selectedItems.push(itemId)
    }
    
    // atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems
    
}
