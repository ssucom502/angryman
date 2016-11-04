-module(am_sup).
-author("pigbrain").

-behaviour(supervisor).

-export([start_link/0]).
-export([init/1]).

-define(SERVER, ?MODULE).

start_link() ->
    supervisor:start_link({local, ?SERVER}, ?MODULE, []).

init([]) ->
    RestartStrategy = one_for_one,
    MaxRestarts = 1000,
    MaxSecondsBetweenRestarts = 3600,

    SupFlags = {RestartStrategy, MaxRestarts, MaxSecondsBetweenRestarts},

    Restart = permanent,
    Shutdown = 2000,

    Children = [{mod_reloader,
                    {am_mod_reloader, start_link, []},
                    Restart, Shutdown, worker, [dynamic]},
                {world_watcher,
                    {am_world_watcher, start_link, []},
                    Restart, Shutdown, worker, [dynamic]}
                ],

    {ok, {SupFlags, Children}}.
