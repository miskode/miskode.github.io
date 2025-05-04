const buffer = 800;

let currentRow = 100
let scrollMode = "scroll";

function add_zeros(x, l) {
    let stringx = x.toString();
    while (stringx.length < l) {
        stringx = `0${stringx}`;
    }
    return stringx;
}

function to_num(str) {
    const convTable = "0123456789ABCDEF";
    let num = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        num += (16 ** (str.length - 1 - i)) * convTable.indexOf(str[i]);
    }
    return num; 
} 

function generate(row, columns) {
    const newRow = document.createElement("tr");
    const header = document.createElement("th");
    header.scope = "row";
    header.appendChild(document.createTextNode(`U+${add_zeros(row, 3)}X`));
    newRow.appendChild(header);
    for (let i = 0; i < 16; i++) {
        const newCol = document.createElement("td");
        if (columns.includes(i.toString(16).toUpperCase())) {
            newCol.appendChild(document.createTextNode(`${String.fromCodePoint(
                to_num(add_zeros(row, 3) + i.toString(16).toUpperCase()))}`));
        }
        newRow.appendChild(newCol);
    }
    const tableBody = document.querySelector("#tablebody");
    tableBody.appendChild(newRow);
}

function generate_to(f, m) {
    let max = to_num(m.toString());
    for (let i = f; i < m; i++) {
        generate(i.toString(16).toUpperCase(), "0123456789ABCDEF");
    }
}

generate_to(8, 20)

addEventListener("scroll", (e) => {
    if (window.scrollY + buffer > document.body.scrollHeight - window.innerHeight 
        && scrollMode === "scroll") {
        generate_to(currentRow, currentRow + 100);
        currentRow += 100;
    }
})

function search() {
    scrollMode = "search";
    const hexRef = "0123456789ABCDEF";
    const rows = document.querySelectorAll("tbody>tr");
    for (let i of rows) {
        i.remove();
    }
    const query = document.querySelector("#searchbar").value.toUpperCase();
    if (!query.includes("X")) {
        generate(query.slice(0, query.length - 1), query[query.length - 1]);
    } else {
        let matchList = [];
        for (let i = 0; i < 16 ** query.length; i++) {
            match = true;
            for (let j = query.length - 1; j >= 0; j--) {
                //console.log(`${add_zeros(i.toString(16), query.length)[j].toUpperCase()}\t${query}\t${query[j]}`);
                if (query[j] !== "X" && query[j] !== add_zeros(i.toString(16), query.length)[j].toUpperCase()) {
                    match = false;
                }
            }
            if (match) {
                matchList.push(add_zeros(i.toString(16).toUpperCase(), 4));
            }
        }
        //console.log(matchList);
        let row = matchList[0].slice(0, matchList[0].length - 1);
        columns = ""
        for (let i of matchList) {
            i = add_zeros(i, 4);
            //console.log(`${row}\t${i.slice(0, i.length - 1)}`);
            if (row === i.slice(0, i.length - 1)) {
                columns += i[i.length - 1];
            } else {
                console.log(`${row}\t${columns}`);
                generate(row, columns);
                row = i.slice(0, i.length - 1);
                columns = i[i.length - 1];
            }
        }
        console.log(`${row}\t${columns}`);
        generate(row, columns);
    }
}