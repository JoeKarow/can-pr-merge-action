const core = require( '@actions/core' );
const github = require( '@actions/github' )
const { Octokit } = require( "@octokit/rest" );
try {
    const pull_number = +core.getInput( 'pr' )
    const octokit = new Octokit()
    const context = github.context.repo
    const { owner, repo } = context

    const pull = octokit.rest.pulls.get( {
        owner,
        repo,
        pull_number
    } )

    core.setOutput( 'ok_to_merge', pull.mergeable )

} catch ( err ) {
    core.setFailed( err.message )
}