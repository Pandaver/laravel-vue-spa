<?php


namespace App\Http\Proxy;


class TokenProxy
{
    protected $http;

    /*
     * TokenProxy constructor.
     * @param $http
     */
    public function __construct(\GuzzleHttp\Client $http)
    {
        $this->http = $http;
    }

    public function login($email, $password)
    {
        if (auth()->attempt(['email' => $email, 'password' => $password])) {
            if (auth()->user()->email_verified == 1) {
                return $this->proxy('password',[
                    'username' => $email,
                    'password' => $password,
                    'scope' => ''
                ]);
            }
            return response()->json([
                'status' => false,
                'message' => 'Email Unverified.'
            ],402);

        }
        return response()->json([
            'status' => false,
            'message' => 'Credentials not match.'
        ],401);
    }

    public function refresh()
    {
        $refresh_token = \request()->cookie('refresh_token');

        return $this->proxy('refresh_token', [
            'refresh_token' => $refresh_token
        ]);

    }

    public function logout()
    {
        $user = auth()->guard('api')->user();
        if (is_null($user)) {
            return response()->json([
                'message' => 'Logout.'
            ],204);
        }
        $accessToken = $user->token();

        app('db')->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true,
            ]);

        $accessToken->revoke();

        return response()->json([
            'message' => 'Logout.'
        ],204)->cookie('refresh_token', null);

    }

    public function proxy($grantType, array $data = [])
    {
        $data = array_merge($data,[
            'client_id'     =>  env('PASSPORT_CLIENT_ID'),
            'client_secret' =>  env('PASSPORT_CLIENT_SECRET'),
            'grant_type'    =>  $grantType,
        ]);
        $response = $this->http->post(env('DOMAIN').'oauth/token',[
            'form_params' => $data
        ]);

        $token = \GuzzleHttp\json_decode((string) $response->getBody(),true);

        return response()->json([
            'token' => $token['access_token'],
            'expired_in' => $token['expires_in']
        ])->cookie('refresh_token', $token['refresh_token'], 60, null, null, false, true);

    }
}
