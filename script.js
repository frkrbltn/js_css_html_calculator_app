let current_expr = {
    first_num: '',
    second_num: '',
    operator: ''
};

let index = 0;
let history = [];

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display_nunber');
    let historyList = document.getElementById('history_list');

    console.log(current_expr);

    // Perform Calculation
    function solveExpression() {
        let first_num = parseFloat(current_expr.first_num);
        let second_num = parseFloat(current_expr.second_num);
        let operator = current_expr.operator;
        let result = 0;

        if(operator == '+') {
            result = first_num + second_num;
        }

        else if(operator == '-') {
            result = first_num - second_num;
        }

        else if(operator == 'x') {
            result = first_num * second_num;
        }

        else if(operator == '/') {
            result = first_num / second_num;
        }

        else {
            result = "Invalid Operator!";
        }

        history[index++] = result;
        console.log("history " + history);
        document.createElement('li');
        historyList.innerHTML += `<li>${current_expr.first_num} ${current_expr.operator} ${current_expr.second_num} = ${result}</li>`;
        current_expr.first_num = result;
        current_expr.second_num = '';
        current_expr.operator = '';
        console.log(current_expr);
    }

    // function solveExpression() {
    //     console.log("Check expression!");
    // }
    document.querySelector('.clear').addEventListener('click', () => {
        historyList.innerHTML = '';
        current_expr.first_num = '';   
        history = [];
    });

    document.querySelector('.equal').addEventListener('click', () => {
        if(current_expr.first_num != '' && current_expr.second_num != '' && current_expr.operator != '') {
            solveExpression();
            document.getElementById('display_number').value = current_expr.first_num;
        }
    });


    document.querySelectorAll('.operand').forEach((operator) => {
        operator.addEventListener('click', (e) => {
                if(current_expr.operator == '') {
                    current_expr.operator = e.target.innerHTML;
                    console.log(current_expr);
                }

                else {
                    if(current_expr.first_num != '' && current_expr.second_num != '') {
                        solveExpression();
                    }

                    else {
                        current_expr.operator = e.target.innerHTML;
                        console.log(current_expr);
                    }
                }
        });
    });

    document.querySelectorAll('.number').forEach((number) => {
        number.addEventListener('click', (e) => {
            if(number.innerHTML == '.') {
                if(current_expr.first_num != '' && current_expr.second_num == '') {
                    if(!current_expr.first_num.includes('.')) {
                        current_expr.first_num += e.target.innerHTML;
                        document.getElementById('display_number').value = current_expr.first_num;
                        console.log(current_expr);
                    }
                }

                else if(current_expr.first_num != '' && current_expr.operator != '' && current_expr.second_num != '') {
                    if(!current_expr.second_num.includes('.')) {
                        current_expr.second_num += e.target.innerHTML;
                        document.getElementById('display_number').value = current_expr.second_num;
                        console.log(current_expr);
                    }
                }
            }

        

            else if(number.innerHTML == 'C') {
                current_expr.first_num = '';
                current_expr.second_num = '';
                current_expr.operator = '';
                document.getElementById('display_number').value = '';
            }

            else {
                if(current_expr.first_num == '' && current_expr.second_num == '') {
                    current_expr.first_num += e.target.innerHTML;
                    document.getElementById('display_number').value = current_expr.first_num;
                    console.log(current_expr);
                }
                
                else if(current_expr.first_num != '' && current_expr.operator == '' && current_expr.second_num == '') {
                    current_expr.first_num += e.target.innerHTML;
                    document.getElementById('display_number').value = current_expr.first_num;
                    console.log(current_expr);
                }

                else if(current_expr.first_num != '' && current_expr.operator != '') {
                    current_expr.second_num += e.target.innerHTML;
                    document.getElementById('display_number').value = current_expr.second_num;
                    console.log(current_expr);
                }
            }
        });
    });
    
    document.querySelector('.display-input').addEventListener('keydown', (e) => {
        if(e.key == "Enter") {
            if(current_expr.first_num != '' && current_expr.second_num != '' && current_expr.operator != '') {
                solveExpression();
            }
            document.getElementById('display_number').value = '';
        }

        else if (e.key == 'Backspace') {
            current_expr.first_num = current_expr.first_num.slice(0, -1);
            console.log(current_expr);
        }

        else if (e.key.match(/[0-9]/)) {
            if(current_expr.first_num == '' && current_expr.second_num == '') {
                current_expr.first_num += e.key;
                //document.querySelector('#display_number').value = current_expr.first_num;
                console.log(current_expr);
            }

            else if(current_expr.first_num != '' && current_expr.operator == '') {
                current_expr.first_num += e.key;
                //document.querySelector('#display_number').value = current_expr.first_num;
                console.log(current_expr);
            }

            else if(current_expr.first_num != '' && current_expr.operator != '') {
                current_expr.second_num += e.key;
                //document.querySelector('#display_number').value = current_expr.second_num;
                console.log(current_expr);
            }         
        }

        else if (!(e.key == '*' || e.key == '-' || e.key == '/' || e.key == '+')) {
            e.preventDefault();
        } else {
            document.getElementById('display_number').value = '';
            if(current_expr.operator == '') {
                current_expr.operator = e.key;
                e.preventDefault();
                console.log(current_expr);
            }

            else {
                if(current_expr.first_num != '' && current_expr.second_num != '') {
                    solveExpression();
                    e.preventDefault();
                    console.log(current_expr);
                }

                else {
                    current_expr.operator = e.key;
                    e.preventDefault();
                    console.log(current_expr);
                }
            }
        }
    });

    document.querySelector('.sign').addEventListener('click', () => {
        // Check if we're currently working with the first or second operand
        if (current_expr.second_num === '' && current_expr.first_num !== '') {
            // If there's only a first number, toggle its sign
            current_expr.first_num = toggleSign(current_expr.first_num);
            document.getElementById('display_number').value = current_expr.first_num;
        } else if (current_expr.second_num !== '') {
            // If a second number exists, toggle its sign
            current_expr.second_num = toggleSign(current_expr.second_num);
            document.getElementById('display_number').value = current_expr.second_num;
        }
        console.log(current_expr);
    });
    
    function toggleSign(number) {
        // Parse the number to ensure it's being treated as a number
        let num = parseFloat(number);
        // Multiply by -1 to change the sign
        num *= -1;
        // Convert back to string to maintain consistency in current_expr
        return num.toString();
    }

    

});

