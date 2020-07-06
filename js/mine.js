//store data in localStorage
var usersData;
if (localStorage.getItem("dataItem")==null) {
	usersData= [];
}else{
	usersData= JSON.parse(localStorage.getItem("dataItem"));
};
//collect data
var userNameInp= document.querySelector('#userNameInp');
var userphoneInp= document.querySelector('#userphoneInp');
var userMailInp= document.querySelector('#userMailInp');
var userAdressInp= document.querySelector('#userAdressInp');
var addContact= document.querySelector('#addContact');
var upDateItem= document.querySelector('#upDateItem');
var inps= document.getElementsByTagName('input');
//message that display if not valid
var nameMsg= document.querySelector('.userName .alert');
var phoneMsg= document.querySelector('.userPhone .alert');
var mailMsg= document.querySelector('.userMail .alert');
var addressMsg= document.querySelector('.userAddress .alert');

//validation on inputs
//validation on userName
var nameRegx= /^[a-zA-Z]{3,9}[0-9]?[0-9]?$/;
userNameInp.addEventListener('blur',function(){
	if (userNameInp.value !='' && nameRegx.test(userNameInp.value)==true) {
		nameMsg.style.display='none';
	}else{
		nameMsg.style.display='block';
	}
});
//validation on userphone
var phoneRegx= /^(002)?(010|011|012|015|016|019)[0-9]{8}$/;
userphoneInp.addEventListener('blur',function(){
	if (userphoneInp.value !='' && phoneRegx.test(userphoneInp.value)==true) {
		phoneMsg.style.display='none';
	}else{
		phoneMsg.style.display='block';
	}
});
//validation on userMail
var mailRegx= /^[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]{0,}@[a-z0-9]{0,65}(\.[a-z]{1,6}){1,4}$/;
userMailInp.addEventListener('blur',function(){
	if (userMailInp.value !='' && mailRegx.test(userMailInp.value)==true) {
		mailMsg.style.display='none'
	}else{
		mailMsg.style.display='block'
	}
});
//validation on userAddress
var addressRegx= /^[a-zA-Z]/;
userAdressInp.addEventListener('blur',function(){
	if (userAdressInp.value !='' && addressRegx.test(userAdressInp.value)==true) {
		addressMsg.style.display='none'
	}else{
		addressMsg.style.display='block'
	}
});
//event on submit
addContact.addEventListener('click', function(e){
	e.preventDefault;
	if (userNameInp.value !='' && nameRegx.test(userNameInp.value)==true &&
		userphoneInp.value !='' && phoneRegx.test(userphoneInp.value)==true &&
		userMailInp.value !='' && mailRegx.test(userMailInp.value)==true &&
		userAdressInp.value !='' && addressRegx.test(userAdressInp.value)==true) {

		//creat object
		var userData= {name:userNameInp.value, phone:userphoneInp.value, mail:userMailInp.value, address:userAdressInp.value};
		usersData.push(userData);
		localStorage.setItem('dataItem', JSON.stringify(usersData));
		displayItems();
		clear();
			
	}else{
		alert('you Must Fill All Fields')
	};
		
});

//display items of array
function displayItems(){
	var temp= '';
	for (let i = 0; i < usersData.length; i++) {
		temp+= `<tr id="row`+i+`">
		<td>`+usersData[i].name+`</td>
		<td>`+usersData[i].phone+`</td>
		<td>`+usersData[i].mail+`</td>
		<td>`+usersData[i].address+`</td>
		<td>
			<span onclick='updateElment(`+i+`)' class="far fa-edit edit"></span>
			<span onclick='deleteItem(`+i+`)' class="fas fa-trash trash"></span>
		</td>
	</tr>`;
	}
	document.getElementById('tableBody').innerHTML= temp;
};

//delete item from usersData
function deleteItem(indx){
	usersData= JSON.parse(localStorage.getItem("dataItem"));
	usersData.splice(indx,1);
	localStorage.setItem('dataItem', JSON.stringify(usersData));
	displayItems();
	clear();
}

//update item in usesData
function updateElment(indx){
	usersData= JSON.parse(localStorage.getItem("dataItem"));
	usersData.find((indx) => {
		return usersData[indx]
	});
	$('html, body').animate({scrollTop: '20px'}, 1000);
	userNameInp.value=usersData[indx].name;
	userphoneInp.value=usersData[indx].phone;
	userMailInp.value=usersData[indx].mail;
	userAdressInp.value=usersData[indx].address;
	addContact.style.display='none';
	upDateItem.style.display='block';	
	//update click
	upDateItem.addEventListener('click', function(e) {
		e.defaultPrevented;
		userData={name:userNameInp.value, phone:userphoneInp.value, mail:userMailInp.value, address:userAdressInp.value};
		usersData.splice(indx,1,userData);
		localStorage.setItem('dataItem', JSON.stringify(usersData));
		displayItems();
		clear();
	});
};

//search about item from array
function searchItem(term){
	temp=''
	for (let i = 0; i < usersData.length; i++) {
		if (usersData[i].name.toLowerCase().includes(term.toLowerCase())) {
			temp+= `<tr id="row`+i+`">
			<td>`+usersData[i].name+`</td>
			<td>`+usersData[i].phone+`</td>
			<td>`+usersData[i].mail+`</td>
			<td>`+usersData[i].address+`</td>
			<td>
				<span onclick='updateElment(`+i+`)' class="far fa-edit edit"></span>
				<span onclick='deleteItem(`+i+`)' class="fas fa-trash trash"></span>
			</td>
		</tr>`;
		}
	}
	document.getElementById('tableBody').innerHTML= temp;
}

//clear the last value of inputs
function clear(){
	for (let i = 0; i < inps.length; i++) {
		inps[i].value=''
	}
};

displayItems();



