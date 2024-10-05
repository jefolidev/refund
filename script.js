const form = document.querySelector('form')

const amount = document.getElementById('amount')

const expense = document.getElementById('expense')
const category = document.getElementById('category')

const expensesQuantity = document.querySelector('aside header p span')
const expensesTotalValue = document.querySelector('aside header h2')
const expenseList = document.querySelector('ul')

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, '')

  value = Number(value) / 100

  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return value
}

form.onsubmit = (e) => {
  e.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')

    const expenseIcon = document.createElement('img')
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute('alt', newExpense.category_name)

    const expenseInfo = document.createElement('div')
    expenseInfo.classList.add('expense-info')

    const expenseName = document.createElement('strong')
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement('span')
    expenseCategory.textContent = newExpense.category_name

    expenseInfo.append(expenseName, expenseCategory)

    const expenseAmount = document.createElement('span')
    expenseAmount.classList.add('expense-amount')
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}`

    const removeIcon = document.createElement('img')
    removeIcon.classList.add('remove-icon')
    removeIcon.setAttribute('src', 'img/remove.svg')
    removeIcon.setAttribute('alt', 'botão de remover')

    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
    expenseList.append(expenseItem)

    updateTotals()
  } catch (error) {
    alert('Não foi possível atualizar a lista de despesas.')
    console.log(error)
  }
}

function updateTotals() {
  try {
    const items = expenseList.children
    const itemsQuantity = items.length

    expensesQuantity.textContent = `${itemsQuantity} ${itemsQuantity > 1 ? 'despesas' : 'despesa'}`

    let total = 0

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector('.expense-amount')

      let value = itemAmount.textContent
        .replace(/[^\d,]/g, '')
        .replace(',', '.')

      value = parseFloat(value)

      if (isNaN(value)) {
        alert(
          'Não foi possível calcular, o carácter inserido não parece ser um número.'
        )
      }

      total += value
    }

    const symbolBRL = document.createElement('small')
    symbolBRL.textContent = 'R$'

    const formattedTotal = formatCurrencyBRL(total)
      .toUpperCase()
      .replace('R$', '')

    expensesTotalValue.innerHTML = ''
    expensesTotalValue.append(symbolBRL, formattedTotal)
  } catch (error) {
    console.log(error)
    alert('Não foi possível atualizar o total')
  }
}
