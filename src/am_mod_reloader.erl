-module(am_mod_reloader).
-author("pigbrain").

-behaviour(gen_server).

-include_lib("kernel/include/file.hrl").

-export([start_link/0]).

-export([init/1,
  handle_info/2,
  terminate/2,
  code_change/3]).

-define(SERVER, ?MODULE).
-define(INTERVAL, 5).

-record(state, {time = 0}).

start_link() ->
  gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

init([]) ->
  timer:send_interval(timer:seconds(?INTERVAL), self(), trigger),
  {ok, #state{time = erlang:localtime()}}.

handle_info(trigger, State) ->
  #state{time = LastTime} = State,
  CurrentTime = erlang:localtime(),

  [check_module(LastTime, CurrentTime, Module, FileName) || {Module, FileName} <- code:all_loaded(), is_list(FileName)],

  {noreply, #state{time = CurrentTime}};

handle_info(_Info, State) ->
  {noreply, State}.

terminate(_Reason, _State) ->
  ok.

code_change(_OldVsn, State, _Extra) ->
  {ok, State}.

check_module(From, To, Module, FileName) ->
  case file:read_file_info(FileName) of
    {ok, #file_info{mtime = MTime}} when MTime >= From, MTime < To -> reload_module(Module);
    _ -> pass
  end.

reload_module(Module) ->
  io:format("Reloading Module(~p)~n", [Module]),
  code:purge(Module),
  code:load_file(Module).