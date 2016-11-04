-module(am_world_watcher).
-author("pigbrain").

-behaviour(gen_server).

-export([start_link/0]).

-export([init/1,
  handle_call/3,
  handle_cast/2,
  handle_info/2,
  terminate/2,
  code_change/3]).

-export([register/1,
  unregister/1]).

-define(SERVER, ?MODULE).

start_link() ->
  gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

init([]) ->
  {ok, gb_sets:new()}.

handle_call(_Request, _From, State) ->
  {reply, ok, State}.

handle_cast({register, Pid}, State) ->
  {noreply, gb_sets:add_element(Pid, State)};

handle_cast({unregister, Pid}, State) ->
  {noreply, gb_sets:del_element(Pid, State)};

handle_cast(_Request, State) ->
  {noreply, State}.

handle_info(_Info, State) ->
  {noreply, State}.

terminate(_Reason, _State) ->
  ok.

code_change(_OldVsn, State, _Extra) ->
  {ok, State}.

register(Pid) ->
  gen_server:cast(?MODULE, {register, Pid}).

unregister(Pid) ->
  gen_server:cast(?MODULE, {unregister, Pid}).