
-module(am_command).
-author("pigbrain").

-include("am_record.hrl").

%% API
-export([result/1,
    command_id/1,
    do/4]).

result(Result) ->
    case Result of
        success -> "200"
    end.

command_id(Command) ->
    case Command of
        login_c2s -> "100000";
        login_s2c -> "100001";
        move_c2s -> "100010";
        move_s2c -> "100011";
        heartbeat_c2s -> "500000";
        heartbeat_s2c -> "500001"
    end.

do(Req, _State, <<"100000">>, RequestCommand) ->
    Character = maps:get(<<"character">>, RequestCommand),
    Nickname = maps:get(<<"nickname">>, RequestCommand),

    Result = am_command:result(success),
    CommandId = am_command:command_id(login_s2c),

    {reply, {text, jsx:encode([{<<"result">>, list_to_binary(Result)},
        {<<"commandId">>, list_to_binary(CommandId)}])}, Req, #player{character = Character, nickname = Nickname}};


do(Req, _State, <<"100010">>, RequestCommand) ->
    DirectionX = maps:get(<<"directionX">>, RequestCommand),
    DirectionY = maps:get(<<"directionY">>, RequestCommand),
    PositionX = maps:get(<<"positionX">>, RequestCommand),
    PositionY = maps:get(<<"positionY">>, RequestCommand),

    Result = am_command:result(success),
    CommandId = am_command:command_id(move_s2c),

    {reply, {text, jsx:encode([{<<"result">>, list_to_binary(Result)},
        {<<"commandId">>, list_to_binary(CommandId)},
        {<<"directionX">>, DirectionX},
        {<<"directionY">>, DirectionY},
        {<<"positionX">>, PositionX},
        {<<"positionY">>, PositionY}])}, Req, _State#player{directionX = DirectionX, directionY = DirectionY, positionX = PositionX, positionY = PositionY}}.