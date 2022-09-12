local luaHelpers = {}

function luaHelpers:printPairs(tbl)
    for k, v in pairs(tbl) do
        print(k, v)
    end
end

return luaHelpers
