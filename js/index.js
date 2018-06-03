(function () {
    var app = angular.module('generatorApp', []);

    app.controller('GeneratorController', ['$scope', generatorController]);

    var x = [];

    function generatorController ($scope) {
        $scope.generateReport = function () {
            readFile('criteria');
            readFile('dataset');
        }

        function readFile(filename) {
            var input = document.getElementById(filename);
            var reader = new FileReader();
            var excelJson = [];

            reader.onload = function () {
                var workbook = XLSX.read(reader.result, {type:'binary'});

                workbook.SheetNames.forEach(function (sheetName) {
                    excelJson = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                });

                x.push(excelJson);
            };

            reader.readAsBinaryString(input.files[0]);
        }
    }
})();