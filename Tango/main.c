// #define DEV

#include <stdio.h>
#include <string.h>

const int row_types[][6] = {
    // {0, 0, 0, 1, 1, 1},
    {0, 0, 1, 0, 1, 1},
    {0, 0, 1, 1, 0, 1},
    // {0, 0, 1, 1, 1, 0},
    {0, 1, 0, 0, 1, 1},
    {0, 1, 0, 1, 0, 1},
    {0, 1, 0, 1, 1, 0},
    {0, 1, 1, 0, 0, 1},
    {0, 1, 1, 0, 1, 0},
    // {0, 1, 1, 1, 0, 0},
    {1, 0, 0, 0, 1, 1},
    {1, 0, 0, 1, 0, 1},
    {1, 0, 0, 1, 1, 0},
    {1, 0, 1, 0, 0, 1},
    {1, 0, 1, 0, 1, 0},
    {1, 0, 1, 1, 0, 0},
    {1, 1, 0, 0, 0, 1},
    {1, 1, 0, 0, 1, 0},
    {1, 1, 0, 1, 0, 0},
    // {1, 1, 1, 0, 0, 0}
};

int game[6][6];
int res_num = 0;
char restrictions[105][5];

// check functions
int is_ok()
{
    // Restrictions
    for (int i = 0; i < res_num; i++)
    {
        if (restrictions[i][0] == '0')
        {
            if (game[restrictions[i][1]][restrictions[i][2]] == 1)
                return 0;
        }
        else if (restrictions[i][0] == '1')
        {
            if (game[restrictions[i][1]][restrictions[i][2]] == 0)
                return 0;
        }
        else if (restrictions[i][0] == '=')
        {
            if (game[restrictions[i][1]][restrictions[i][2]] != game[restrictions[i][3]][restrictions[i][4]])
                return 0;
        }
        else if (restrictions[i][0] == 'x')
        {
            if (game[restrictions[i][1]][restrictions[i][2]] == game[restrictions[i][3]][restrictions[i][4]])
                return 0;
        }
    }

    // Column restrictions
    for (int j = 0; j < 6; j++)
    {
        // No 3 a go
        for (int i = 0; i < 4; i++)
            if (game[i][j] == game[i + 1][j] && game[i][j] == game[i + 2][j])
                return 0;
        // Num = 3
        int _num = 0;
        for (int i = 0; i < 6; i++)
            _num += game[i][j];
        if (_num != 3)
            return 0;
    }

    return 1;
}

// DFS
void dfs(int step)
{
    if (step == 6)
    {
        if (is_ok())
        {
            for (int i = 0; i < 6; i++)
            {
                for (int j = 0; j < 6; j++)
                    printf("%d ", game[i][j]);
                printf("\n");
            }
            printf("\n");
        }
        return;
    }
    for (int i = 0; i < 16; i++)
    {
        for (int j = 0; j < 6; j++)
            game[step][j] = row_types[i][j];
        dfs(step + 1);
    }
}

int main()
{
    freopen("example.in", "r", stdin);
    // freopen("example.out", "w", stdout);

    memset(game, 0, sizeof(game));
    memset(restrictions, 0, sizeof(restrictions));

    while (1)
    {
        scanf("%c", &restrictions[res_num][0]);

        if (restrictions[res_num][0] == '0' || restrictions[res_num][0] == '1')
        {
            scanf("%s%s", &restrictions[res_num][1], &restrictions[res_num][2]);
            restrictions[res_num][1] -= 49;
            restrictions[res_num][2] -= 49;
            res_num++;
        }

        else if (restrictions[res_num][0] == 'x' || restrictions[res_num][0] == '=')
        {
            scanf("%s%s%s%s", &restrictions[res_num][1], &restrictions[res_num][2], &restrictions[res_num][3], &restrictions[res_num][4]);
            restrictions[res_num][1] -= 49;
            restrictions[res_num][2] -= 49;
            restrictions[res_num][3] -= 49;
            restrictions[res_num][4] -= 49;
            res_num++;
        }

        else if (restrictions[res_num][0] == 'q')
            break;
    }

#ifdef DEV
    for (int i = 0; i < res_num; i++)
    {
        printf("%c ", restrictions[i][0]);
        if (restrictions[i][0] == '0' || restrictions[i][0] == '1')
        {
            for (int j = 1; j <= 2; j++)
                printf("%d ", restrictions[i][j]);
        }
        else if (restrictions[i][0] == '=' || restrictions[i][0] == 'x')
        {
            for (int j = 1; j <= 4; j++)
                printf("%d ", restrictions[i][j]);
        }
        printf("\n");
    }
#endif

    dfs(0);

    return 0;
}