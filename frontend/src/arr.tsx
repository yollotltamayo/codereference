let arr = [
    {
        "topic":"binary search",
        "content" :`
cou = 0
map = Dict{Int32, Int32}()  
ban = 1
while ban == 1
    for a in text
        num= a[2:end]
        num = parse(Int32,num)
        if a[1] == '-'
            num*=-1
        end
        global cou += num
        if haskey(map , cou) == true
            global ban = 0
            break
        else
            push!(map, cou => 3)
        end
    end
end
println(cou)`,
        "id":0,
        "author":"yolo",
    },
    {
        "topic":"earch",
        "id":1,
        "content":"l",
        "author":"yolo",
    },{
        "topic":"earch",
        "content" :"o ", 
        "id":9,
        "author":"yolo",
    },{
        "topic":"earch",
        "content" :"const Cards = () => ( <Card> <p> skdjfskdjf</p> ", 
        "id":7,
        "author":"yolo",
    },{
        "topic":"earch",
        "content" :"const Cards = () => ( <Card> <p> skdjfskdjf</p> ", 
        "id":5,
        "author":"yolo",
    },{
        "topic":"earch",
        "content" :"a", 
        "id":3,
        "author":"yolo",
    },];
export default arr;
