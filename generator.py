Array = [[0,0,0,1,1,1,1,1,0,0,0,0],
         [0,0,1,1,1,1,1,1,1,1,1,0],
         [0,0,1,1,1,1,1,1,1,0,0,0],
         [0,1,1,1,1,1,1,1,1,1,1,0],
         [0,1,1,1,1,1,1,1,1,1,1,1],
         [0,1,1,1,1,1,1,1,1,1,1,0],
         [0,0,0,1,1,1,1,1,1,1,0,0],
         [0,0,1,1,1,1,1,1,0,0,0,0],
         [0,1,1,1,1,1,1,1,1,1,1,0],
         [1,1,1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1,1,1],
         [0,0,1,1,1,0,0,1,1,1,0,0],
         [0,1,1,1,0,0,0,0,1,1,1,0],
         [1,1,1,1,0,0,0,0,1,1,1,1]]
points = []
for y in range(len(Array)):
    for x in range(len(Array[y])):
        if Array[y][x] == 0:
            continue
        else:
            if x-1 < 0:
                points.append([(y+1)/16,(x)/12])
                points.append([(y)/16,(x)/12])
            else:
                if y-1 < 0:
                    points.append([(y)/16,(x)/12])
                else:
                    if Array[y-1][x-1] != 1:
                        points.append([(y)/16,(x)/12])
                if y+1 > len(Array)-1:
                    points.append([(y+1)/16,(x)/12])
                else:
                    if Array[y+1][x-1] != 1:
                        points.append([(y+1)/16,(x)/12])
            
            if x+1 > len(Array[y])-1:
                points.append([(y+1)/16,(x+1)/12])
                points.append([(y)/16,(x+1)/12])
            else:
                if y-1 < 0:
                    points.append([(y)/16,(x+1)/12])
                else:
                    if Array[y-1][x+1] != 1:
                        points.append([(y)/16,(x+1)/12])
                if y+1 > len(Array)-1:
                    points.append([(y+1)/16,(x+1)/12])
                else:
                    if Array[y+1][x+1] != 1:
                        points.append([(y+1)/16,(x+1)/12])

print(points)

