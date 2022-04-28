let id = 'no'
window.onload = selectData;

function addData() {
    document.getElementById('msg').innerHTML = '';
    let nameEl = document.getElementById('name').value;
    //  let date = document.getElementById('date').value;
    if (nameEl == '') {
        document.getElementById('msg').innerHTML = "Please Enter Name"
    } else {
        console.log(id)
        if (id == 'no') {
            let arr = getCrudData()
            if (arr == null) {
                let localData = [nameEl]
                setCrudData(localData)
            } else {
                arr.push(nameEl);
                setCrudData(arr);
            }
            document.getElementById('name').value = ''
            document.getElementById('msg').innerHTML = "Data Added"
        } else {
            let arr = getCrudData();
            arr[id] = nameEl;
            setCrudData(arr);
            document.getElementById('msg').innerHTML = "Data Edited"
        }
        selectData();
    }
}

function selectData() {
    let arr = getCrudData()
    if (arr != null) {
        let html = '';
        let sno = 1;
        for (let i in arr) {
            html = html + `<tr><td>${sno}</td><td>${arr[i]}</td><td><a class="btn btn-primary btn-sm" href="javascript:void(0)" onclick='editData(${i})'>Edit</a></td> <td><a class="btn btn-danger btn-sm float-end" href='javascript:void(0)' onclick='deleteData(${i})'>Delete</a></td></tr>`
            sno++;

        }
        document.getElementById('root').innerHTML = html;
    }
}

function editData(eid) {
    id = eid
    let arr = getCrudData();
    document.getElementById('name').value = arr[eid]
}

function deleteData(rid) {
    let arr = getCrudData();
    arr.splice(rid, 1)
    setCrudData(arr);
    selectData();

}

function getCrudData() {
    let arr = JSON.parse(localStorage.getItem('crud'))
    return arr;
}

function setCrudData(arr) {
    localStorage.setItem('crud', JSON.stringify(arr));

}



