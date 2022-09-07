const daiContractAddress = "0x29282139fD1A88ccAED6d3bb7f547192144C0f95"
const astonVillaVsEvertonContractAddress = "0x492A982dd50696383F9e17eb87E52f5A158beDfE"
const SevillaVSValladolidContractAddress = "0x492A982dd50696383F9e17eb87E52f5A158beDfE"
const ValenciaVsAtleticoMadrid = "0x2E632Caf45071A3e656Aa865906bDd4957E7B15A"
const matchList = [SevillaVSValladolidContractAddress, ValenciaVsAtleticoMadrid]
const requestId = ["0x48a6e2a61be93ac9ac688aa2c1a5fede2ecd1d894cfd2b3e5e7ba3c6008f8503","0x6b4ea3d2db003041de2ce87d0b8c319268d5d34c70ebbf067addbdbc2320f550"]


const daiAbi = require("./daiAbi.json")
const betContractAbi = require("./betContractAbi.json")



module.exports = {
    daiAbi,
    daiContractAddress,
    betContractAbi,
    astonVillaVsEvertonContractAddress,
    SevillaVSValladolidContractAddress,
    matchList,
    requestId
}