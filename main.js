var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');

// Controls the ammount of creeps
function Spawning()
{
    for (var name in Memory.creeps)
    {
        if (!Game.creeps[name])
        {
            delete Memory.creeps[name];
        }
    }

    var controllerLevel = 0;

    for (var name in Game.rooms)
    {
        controllerLevel = controllerLevel + Game.rooms[name].controller.level;
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if (harvesters.length < controllerLevel * controllerLevel)
    {
        Game.spawns.Main.createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester' });
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if (builders.length < harvesters.length * 0.75)
    {
        Game.spawns.Main.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'builder' });
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if (upgraders.length < harvesters.length / 4)
    {
        Game.spawns.Main.createCreep([WORK, CARRY, MOVE], undefined, { role: 'upgrader' });
    }

    var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');

    if (guards.length < controllerLevel * 1.5)
    {
        Game.spawns.Main.createCreep([MOVE, MOVE, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, { role: 'guard' });
    }
}

module.exports.loop = function ()
{
    Spawning();

    // Update loop for the creeps
    for (var name in Game.creeps)
    {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester')
        {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader')
        {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder')
        {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'guard')
        {
            roleGuard.run(creep);
        }
    }
}
