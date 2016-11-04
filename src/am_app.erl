-module(am_app).
-author("pigbrain").

-behaviour(application).

-export([start/2,
    stop/1]).

start(_StartType, _StartArgs) ->

    %% http://learnyousomeerlang.com/building-otp-applications
    {ok, Port} = application:get_env(port),

    ok = application:start(crypto),
    ok = application:start(cowlib),
    ok = application:start(ranch),
    ok = application:start(cowboy),

    Dispatch = cowboy_router:compile([
                {'_', [
                    {"/", cowboy_static, {priv_file, am, "html/am.html"}},
                    %%{"/play", cowboy_static, {priv_file, am, "html/am_play.html"}},
                    {"/am", am_ws_handler, []},
                    {"/static/[...]", cowboy_static, {priv_dir, am, "static"}}]
                }
            ]),

    {ok, _} = cowboy:start_http(http, 100, [{port, Port}], [
            {env, [{dispatch, Dispatch}]}
        ]),

    case am_sup:start_link() of
        {ok, Pid} ->
            io:format("start ok!"),
            {ok, Pid};
        Error ->
            Error
    end.

stop(_State) ->
    ok.


