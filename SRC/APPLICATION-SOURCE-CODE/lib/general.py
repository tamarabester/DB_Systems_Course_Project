

def add_rank_to_list(list_to_rank, ranking_function):
    list_to_rank.sort(key=ranking_function)
    for i in range(len(list_to_rank)):
        item = list_to_rank[i]
        item["rank"] = i + 1