(function () {
    var app = angular.module('generatorApp', []);

    app.controller('GeneratorController', ['$scope', generatorController]);

    var excelJsonObj = [];

    function generatorController ($scope) {
        $scope.uploadExcel = function () {
            var myFile = document.getElementById('criteria');
            var input = myFile;
            var reader = new FileReader();

            reader.onload = function () {
                var fileData = reader.result;
                var workbook = XLSX.read(fileData, {type:'binary'});

                workbook.SheetNames.forEach(function (SheetName) {
                    var rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[SheetName]);

                    excelJsonObj = rowObject;
                });

                console.log(excelJsonObj);
            };

            reader.readAsBinaryString(myFile.files[0]);
        }
    }
})();