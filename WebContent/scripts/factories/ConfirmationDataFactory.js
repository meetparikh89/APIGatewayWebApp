AdminUtilityApp.service('ConfirmationDataFactory',function(){

var ClientName='';
var AllIPRanges='';
var AddIPRanges ='';
var DeleteIPRanges='';
var Validity = '';
var IsUpdate='';
var Password='';

return {
setClientName :function(clientName){
ClientName=clientName;
},
setUpdateRequest:function(isUpdate){
IsUpdate=isUpdate;
},
setPassword:function(password){
Password=password;
},
setValidity:function(validity){
	Validity = validity;
},
setAllIPRanges:function(allIPRanges){
AllIPRanges=allIPRanges;
},
setAddIPRanges:function(IPRange){
AddIPRanges=IPRange;
},
setDeleteIPRanges:function(IPRange){
DeleteIPRanges=IPRange;
},
getClientName:function(){
return ClientName;
},
getIPRangesToBeAdded:function(){
return AddIPRanges;
},
getUpdateRequest:function(){
return IsUpdate;
},
getIPRangesToBeDeleted:function(){
return DeleteIPRanges;
},
getAllIPRanges:function(){
return AllIPRanges;
},
getValidity:function(){
return Validity;
},
getPassword:function(){
return Password;
}
};
});