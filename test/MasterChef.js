const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  describe("MasterChef", function () {
    async function deployMasterChef() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const Narfex = await ethers.getContractFactory("Narfex");
      const narfex = await Narfex.deploy();
      await narfex.deployed();
    
      const MasterChef = await ethers.getContractFactory("MasterChef");
      const masterChef = await MasterChef.deploy(narfex.address, 10);
      await masterChef.deployed();

      const lpToken = await ethers.getContractFactory("lpToken");
      const lptoken = await lpToken.deploy();
      await lptoken.deployed();
    
        return { masterChef, narfex, lptoken, owner, otherAccount };
      };


    describe("All tests", function () {
        it("Should set harvest interval", async function () {
        const { masterChef } = await loadFixture(deployMasterChef);

          await masterChef.setHarvestInterval(3600);

          expect(await masterChef.harvestInterval()).to.equal(3600);
        });

        it("Should set early harvest comission interval", async function () {
          const { masterChef } = await loadFixture(deployMasterChef);
  
            await masterChef.setEarlyHarvestCommissionInterval(10);
  
            expect(await masterChef.earlyHarvestCommissionInterval()).to.equal(10);
          });

        it("Should set early harvest commission", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);
    
              await masterChef.setEarlyHarvestCommission(10);
    
              expect(await masterChef.earlyHarvestCommission()).to.equal(10);
            });

        it("Should set referral percent", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);

              await masterChef.setReferralPercent(5);

          expect(await masterChef.referralPercent()).to.equal(5);
        });

        it("Should mass update pools", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);
    
              await masterChef.massUpdatePools();
            });

        it("Should return pools count", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);
    
              await masterChef.getPoolsCount();
              expect(await masterChef.getPoolsCount()).to.equal(0);
            });
        it("Should return balance of narfex", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);
    
              await masterChef.getNarfexLeft();
              expect(await masterChef.getNarfexLeft()).to.equal(0);
            });
        it("Should withdraw narfex", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);
    
              await masterChef.withdrawNarfex(0);
            });

        it("Should add a new pool", async function () {
            const { masterChef, lptoken, owner } = await loadFixture(deployMasterChef);

            await lptoken.mint(owner.address,100000);

            await masterChef.add(1000, lptoken.address, 1);
          });

        it("Should withdraw narfex", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);
    
              await masterChef.withdrawNarfex(0);
            });

        it("Should set reward per block", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);
    
              await masterChef.setRewardPerBlock(100, 1);
              expect(await masterChef.rewardPerBlock()).to.equal(100);
            });

        it("Should set reward per block without update", async function () {
            const { masterChef } = await loadFixture(deployMasterChef);
    
              await masterChef.setRewardPerBlock(100, 0);
              expect(await masterChef.rewardPerBlock()).to.equal(100);
            });

        it("Should return settings", async function () {
        const { masterChef } = await loadFixture(deployMasterChef);

          await masterChef.setRewardPerBlock(100, 1);
          expect(await masterChef.rewardPerBlock()).to.equal(100);

          await masterChef.getSettings();
          //expect(await masterChef.getSettings()).to.equal(
            //rewardPerBlock,
            //earlyHarvestCommissionInterval,
            //harvestInterval,
            //earlyHarvestCommission,
            //referralPercent);
        });

        //it("Should update a pool", async function () {
          //const { masterChef } = await loadFixture(deployMasterChef);
  
            //await masterChef.updatePool(0);
          //});
    });
});